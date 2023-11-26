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

@WebServlet("/Login")
public class Login extends HttpServlet {
	
	private static Connection conn = null;

	private static final long serialVersionUID = 1L;

	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user = request.getParameter("user");
		String password = request.getParameter("password");
		
		System.out.println(user);
		System.out.println(password);
		
		Statement st = null;
		ResultSet rs = null;

		PrintWriter out = response.getWriter();

		connect("jdbc:mysql://localhost/chefslist?user=root&password=root");

		response.setStatus(200); // updated later as necessary
		response.setContentType("application/json");

		try {
			st = conn.createStatement();
			rs = st.executeQuery("SELECT * FROM Users WHERE Username=\"" + user + "\" AND Password=\"" +password+ "\"");
			if (rs.next()) {
				// Restaurant is a favorite
				System.out.println("Login succes for " + user);
			} else {
				// Restaurant is not a favorite
				response.setStatus(400);
				System.out.println("Could not login");
			}
			
			out.println(new Gson().toJson(user));
			
			rs.close();
			st.close();
			conn.close();
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
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
