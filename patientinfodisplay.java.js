import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class PatientInfoDisplay {
    // JDBC URL, username, and password of Oracle database
    private static final String JDBC_URL = "jdbc:oracle:thin:@//localhost:1521/your_database_name";
    private static final String USERNAME = "your_username";
    private static final String PASSWORD = "your_password";

     public static void main(String[] args) {
        try {
            // Load the Oracle JDBC driver
            Class.forName("oracle.jdbc.driver.OracleDriver");

            // Connect to the database
            Connection connection = DriverManager.getConnection(JDBC_URL, USERNAME, PASSWORD);

            // Create a statement
            Statement statement = connection.createStatement();

            // Execute SQL query to fetch patient information
            String sqlQuery = "SELECT patient_id, name, problem, bill FROM patients";
            ResultSet resultSet = statement.executeQuery(sqlQuery);

            // Display fetched data
            System.out.println("Patient Information:");
            System.out.println("ID\tName\tProblem\tBill");
            while (resultSet.next()) {
                int patientId = resultSet.getInt("patient_id");
                String name = resultSet.getString("name");
                String problem = resultSet.getString("problem");
                double bill = resultSet.getDouble("bill");

                System.out.println(patientId + "\t" + name + "\t" + problem + "\t" + bill);
            }

            // Close all resources
            resultSet.close();
            statement.close();
            connection.close();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
}
