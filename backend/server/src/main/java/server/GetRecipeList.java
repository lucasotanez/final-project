package server;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/GetRecipeList")
public class GetRecipeList extends HttpServlet{
	private static Connection conn = null;

	private static final long serialVersionUID = 1L;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		String[] ingredients = request.getParameterValues("ingredient");
		PreparedStatement ps = null;
		ResultSet rs = null;
		connect("jdbc:mysql://localhost/GROCERY_SCHEMA?user=root&password=root");

		response.setStatus(200); 
		response.setContentType("application/json");
		
		// Set CORS headers
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers", "*");
		response.addHeader("Access-Control-Allow-Methods", "GET, OPTIONS, HEAD, PUT, POST, DELETE");

		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		try {
			//given a list of ingredients, return a list of recipes that includes at least one of either ingredient. sort by recipe that contains the most ingredients first
			ps = conn.prepareStatement("SELECT r.recipe_id, r.recipe_title, COUNT(DISTINCT ri.ingredient) AS matching_ingredients_count " +
                    "FROM recipes r " +
                    "JOIN recipe_ingredients_ner ri ON r.recipe_id = ri.recipe_id " +
                    "WHERE ri.ingredient IN (" + preparePlaceholders(ingredients.length) + ") " +
                    "GROUP BY r.recipe_id, r.recipe_title " +
                    "ORDER BY matching_ingredients_count DESC");
			
			for (int i = 0; i < ingredients.length; i++) {
	            ps.setString(i + 1, ingredients[i]);
	        }
			
			rs = ps.executeQuery();
			
			JsonObject responseJson = new JsonObject();

            int i = 0;
            while (rs.next()) {
                int recipeId = rs.getInt("recipe_id");
                String recipeTitle = rs.getString("recipe_title");
                int matchingIngredientsCount = rs.getInt("matching_ingredients_count");

                JsonObject recipeObject = new JsonObject();
                recipeObject.addProperty("recipeId", recipeId);
                recipeObject.addProperty("recipeTitle", recipeTitle);
                recipeObject.addProperty("matchingIngredientsCount", matchingIngredientsCount);

                responseJson.add(Integer.toString(i++), recipeObject);
            }

			out.println(new Gson().toJson(responseJson));

			System.out.println("Retrieved recipe list for " + username);
			
			rs.close();
			ps.close();
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	private static void connect(String url) {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(url);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
	private String preparePlaceholders(int length) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            if (i > 0) {
                sb.append(",");
            }
            sb.append("?");
        }
        return sb.toString();
    }
}