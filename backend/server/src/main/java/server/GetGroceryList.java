package server;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.sql.*;

@WebServlet("/GetGroceryList")
public class GetGroceryList extends HttpServlet {
	
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

		try {
			JsonObject responseJson = new JsonObject();
			
			// Iterator for each row returned
			int i = 0;

			ps = conn.prepareStatement("SELECT * FROM groceries g, users u WHERE u.user_id = g.user_id AND u.username=? ORDER BY g.expiration_date ASC");
			ps.setString(1, username);
			
			rs = ps.executeQuery();

			while (rs.next()) {
				JsonObject j = new JsonObject();
				j.addProperty("grocery_name", rs.getString("grocery_name"));
				j.addProperty("expiration_date", rs.getString("expiration_date"));
				j.addProperty("count", rs.getString("quantity"));
				
				responseJson.add(Integer.toString(i++), j);
			}
			out.println(new Gson().toJson(responseJson));

			System.out.println("Retrieved grocery list for " + username);
			
			rs.close();
			ps.close();
			conn.close();
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
			response.setStatus(500);
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
