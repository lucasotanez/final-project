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

@WebServlet("/GetRecipeItem")
public class GetRecipeItem extends HttpServlet{
	private static Connection conn = null;

	private static final long serialVersionUID = 1L;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String recipe_id = request.getParameter("recipe_id");
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
			// get the list of ingredients for that user
			// store ingredients in set to avoid duplicates
			ps = conn.prepareStatement("SELECT * FROM recipes WHERE recipe_id = ?");
			ps.setString(1, recipe_id);
			rs = ps.executeQuery();

			JsonObject responseJson = new JsonObject();
			
			if (rs.next()) {
				responseJson.addProperty("recipeTitle", rs.getString("recipe_title"));
				responseJson.addProperty("recipeIngredients", rs.getString("recipe_ingredients"));
				responseJson.addProperty("recipeDirections", rs.getString("recipe_directions"));
				responseJson.addProperty("recipeLink", rs.getString("recipe_link"));
			}

			out.println(new Gson().toJson(responseJson));

			System.out.println("Retrieved recipe #" + recipe_id);
			
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
}
