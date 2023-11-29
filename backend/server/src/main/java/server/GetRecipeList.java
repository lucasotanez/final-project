package server;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

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

		JsonObject responseJson = new JsonObject();

		try {
			// get the user id from the username
			ps = conn.prepareStatement("SELECT * FROM users WHERE username=?");
			ps.setString(1, username);
			rs = ps.executeQuery();
			int user_id = -1;
			if (rs.next()) {
				user_id = rs.getInt("user_id");
			} else {
				throw new Exception("user does not exist");
			}

			// get the list of ingredients for that user
			// store ingredients in set to avoid duplicates
			Set<String> set = new HashSet<String>();
			ps = conn.prepareStatement("SELECT grocery_name FROM groceries WHERE user_id = ?");
			ps.setInt(1, user_id);
			rs = ps.executeQuery();
			
			if (rs.next()) set.add(rs.getString("grocery_name"));
			else throw new Exception("user has no groceries");

			while (rs.next()) set.add(rs.getString("grocery_name"));
			
			ArrayList<String> ingredients = new ArrayList<String>(set);

			//given a list of ingredients, return a list of recipes that includes at least one of either ingredient. sort by recipe that contains the most ingredients first
			// limit results to 20, since the number of returned recipes may be large
			ps = conn.prepareStatement("SELECT r.recipe_id, r.recipe_title, COUNT(DISTINCT ri.ingredient) AS matching_ingredients_count " +
                    "FROM recipes r " +
                    "JOIN recipe_ingredients_ner ri ON r.recipe_id = ri.recipe_id " +
                    "WHERE ri.ingredient IN (" + preparePlaceholders(ingredients.size()) + ") " +
                    "GROUP BY r.recipe_id, r.recipe_title " +
                    "ORDER BY matching_ingredients_count DESC LIMIT 20");
			
			for (int i = 0; i < ingredients.size(); i++) {
	            ps.setString(i + 1, ingredients.get(i));
	        }
			
			rs = ps.executeQuery();

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
            
            if (i == 0) throw new Exception("no grocery results");

			out.println(new Gson().toJson(responseJson));

			System.out.println("Retrieved recipe list for " + username);
			
			rs.close();
			ps.close();
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
			responseJson.addProperty("noResult", true);
			out.println(new Gson().toJson(responseJson));
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
