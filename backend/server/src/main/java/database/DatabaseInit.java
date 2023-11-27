package database;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;


public class DatabaseInit {

	public static void main(String[] args) {	
		try {
			CSVFormat format = CSVFormat.DEFAULT.builder()                                                                  
				    .setDelimiter(',')
				    .setHeader()
				    .setSkipHeaderRecord(true)  // skip header
				    .build();
			Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/GROCERY_SCHEMA?user=root&password=root");
			CSVParser csvReader = new CSVParser(new BufferedReader(new FileReader("dataset.csv")), format);
			
			// Create PreparedStatement
			PreparedStatement ps = conn.prepareStatement("INSERT INTO recipes (recipe_title, recipe_ingredients, recipe_directions, recipe_link) VALUES (?, ?, ?, ?)");

			// Create PreparedStatement for the ingredients
			PreparedStatement ps_ingredients = conn.prepareStatement("INSERT INTO recipe_ingredients_ner (recipe_id, ingredient) VALUES (?, ?)");
			
			// Set auto-commit to false
			conn.setAutoCommit(false);
			
			// Recipe id 
			int recipe_id = 1;
			
			for (CSVRecord csvRecord : csvReader) {
				ps.setString(1, csvRecord.get(1));
				ps.setString(2, csvRecord.get(5));
				ps.setString(3, csvRecord.get(6));
				ps.setString(4, csvRecord.get(3));
				
				String[] ingredients = csvRecord.get(4).split(",");
				for (String ingredient : ingredients) {
					if (!ingredient.isEmpty()) {
						ps_ingredients.setInt(1 , recipe_id);
						ps_ingredients.setString(2, ingredient.strip());
						ps_ingredients.addBatch();
					}
				}
				
				// add recipe creation query to batch
				ps.addBatch();
				
				// increment recipe_id
				recipe_id++;
			}
			
			// execute batch insert of recipes first
			ps.executeBatch();
			
			// then insert ingredients
			ps_ingredients.executeBatch();
			
			// commit results
			conn.commit();
			
			// clean up
			conn.close();
			ps.close();
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
