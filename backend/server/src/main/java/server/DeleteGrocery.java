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
import java.sql.*;

@WebServlet("/DeleteGrocery")
public class DeleteGrocery extends HttpServlet {
	
	private static Connection conn = null;

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user = request.getParameter("username");
		String item = request.getParameter("item");
		String expiration_date = request.getParameter("expiration_date");
		String count = request.getParameter("count");
		
		System.out.println(user);
		System.out.println(item);
		System.out.println(expiration_date);
		System.out.println(count);
		
		PreparedStatement ps = null;
		ResultSet rs = null;

		PrintWriter out = response.getWriter();

		connect("jdbc:mysql://localhost/GROCERY_SCHEMA?user=root&password=root");

		response.setStatus(200); 
		response.setContentType("application/json");
		
		// Set CORS headers
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Headers", "*");
		response.addHeader("Access-Control-Allow-Methods", "GET, OPTIONS, HEAD, PUT, POST, DELETE");

		try {
			ps = conn.prepareStatement("SELECT user_id FROM users WHERE username=?");

			ps.setString(1, user);
			String uid = null;
			rs = ps.executeQuery();
			if (rs.next()) uid = rs.getString("user_id");
			if (uid == null) {
				throw new Exception("user does not exist");
			}

			ps = conn.prepareStatement("DELETE FROM groceries WHERE user_id=? AND grocery_name=? AND expiration_date=? AND quantity=?");
			ps.setString(1, uid);
			ps.setString(2, item);
			ps.setString(3, expiration_date);
			ps.setString(4, count);
			ps.executeUpdate();

			out.println(new Gson().toJson("Deleted item for " + user));
			
			rs.close();
			ps.close();
			conn.close();
			
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(500);
			out.println("null");
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
