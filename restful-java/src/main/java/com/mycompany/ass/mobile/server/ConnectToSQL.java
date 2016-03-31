/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.ass.mobile.server;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
/**
 *
 * @author DRAGON
 */
public class ConnectToSQL {
    public static final String ERROR = "Error";
    public static final String NOTMATCH = "NotMatch";
    public static final String SQLSERVER = "sqlserver";
    public static final String SQLSERVERDRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    public static final String MYSQL = "mysql";
    public static final String MYSQLDRIVER = "com.mysql.jdbc.Driver";
    public static final String POSTGRESQL = "postgresql";
    public static final String POSTGRESQLDRIVER = "org.postgresql.Driver";

    Connection dbConnection = null;

    public ConnectToSQL(String type, String host, String dbname, String user, String pwd) {
        this.dbConnection = getDBConnection(type, host, dbname, user, pwd);
    }

    private Connection getDBConnection(String type, String host, String dbname, String user, String pwd) {
        if (type != null && !type.isEmpty()) {
            try {
                if (type.equalsIgnoreCase(SQLSERVER)) {
                    Class.forName(SQLSERVERDRIVER);
                    dbConnection = DriverManager.getConnection(host + ";database=" + dbname + ";sendStringParametersAsUnicode=true;useUnicode=true;characterEncoding=UTF-8;", user, pwd);
                } else if (type.equalsIgnoreCase(MYSQL)) {
                    Class.forName(MYSQLDRIVER);
                    dbConnection = DriverManager.getConnection(host + "/" + dbname, user, pwd);
                } else if (type.equalsIgnoreCase(POSTGRESQL)) {
                    Class.forName(POSTGRESQLDRIVER);
                    dbConnection = DriverManager.getConnection("jdbc:postgresql://"+host + "/" + dbname + "?sslmode=require", user, pwd);
                    /*Class.forName(POSTGRESQLDRIVER);
                    Properties props = new Properties();
                    props.put("user", user);
                    props.put("password", pwd);
                    props.put("sslmode", "require");
                    dbConnection = DriverManager.getConnection("jdbc:postgresql://"+ host + "/" + dbname, props);*/
                }
                return dbConnection;
            } catch (ClassNotFoundException | SQLException ex) {
                  System.out.println("LOI te LE ROI NE");
               // System.err.println(ex.getMessage());
            }
        }
      //  if(dbConnection==null) System.out.println("LOI ROI NE");
        return dbConnection;
    }
    
    public String getUser(int id) {
        try {
            String n="";
            String img="";
            String SQL = "SELECT name, image FROM public.users WHERE id = " + id + ";";
            Statement stmt = this.dbConnection.createStatement();
            ResultSet rs = stmt.executeQuery(SQL);

            // Iterate through the data in the result set and display it.  
            if (rs.next()) {
                n =rs.getString("name");
                img=rs.getString("image");
               // System.out.println("User exists");
                
            }
            return "Name:"+n+"Image:"+img;
        } catch (SQLException sqle) {
            System.err.println(sqle.getMessage());
        } finally {
            if (this.dbConnection != null) {
                try {
                    this.dbConnection.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
        }
        return "";
    }
    public Object[] getUser2(int id) {
        try {
            String SQL = "SELECT * FROM public.users WHERE id = " + id + ";";
            Statement stmt = this.dbConnection.createStatement();
            ResultSet rs = stmt.executeQuery(SQL);

            // Iterate through the data in the result set and display it.  
            if (rs.next()) {
                Object[] res = new Object[9];
                res[0] = rs.getInt(1);//id
                res[1] = rs.getString(2);//username
                //System.out.println("name la:"+rs.getString(2));
                res[2] = rs.getString(3);//password
                res[3] = rs.getString(4);//name
                res[4] = rs.getString(5);//email
                res[5] = rs.getInt(6);//status
                res[6] = rs.getString(7);//image
                res[7] = rs.getFloat(8);//floatX
                res[8] = rs.getFloat(9);//floatY
                return res;
            }
        } catch (SQLException sqle) {
            System.err.println(sqle.getMessage());
        } finally {
            if (this.dbConnection != null) {
                try {
                    this.dbConnection.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
        }
        return null;
    }
    public Object[] getUser3(String username, String password) {
        try {
                String SQL = "SELECT * FROM public.users  WHERE username = '" + username + "' AND password = '" + password + "';";
                Statement stmt = this.dbConnection.createStatement();
                ResultSet rs = stmt.executeQuery(SQL);

                // Iterate through the data in the result set and display it.  
                if (rs.next()) {
                Object[] res = new Object[9];
                res[0] = rs.getInt(1);//id
                res[1] = rs.getString(2);//username
                //System.out.println("name la:"+rs.getString(2));
                res[2] = rs.getString(3);//password
                res[3] = rs.getString(4);//name
                res[4] = rs.getString(5);//email
                res[5] = rs.getInt(6);//status
                res[6] = rs.getString(7);//image
                res[7] = rs.getFloat(8);//floatX
                res[8] = rs.getFloat(9);//floatY
                return res;
            }
        } catch (SQLException sqle) {
            System.err.println(sqle.getMessage());
        } finally {
            if (this.dbConnection != null) {
                try {
                    this.dbConnection.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
        }
        return null;
    }
    public List<Object[]> getall(){
        try {
            String SQL = "SELECT * FROM public.users;";
            Statement stmt = this.dbConnection.createStatement();
            ResultSet rs = stmt.executeQuery(SQL);
            
            // Iterate through the data in the result set and display it.
            List<Object[]> user_list=new ArrayList<Object[]>();
            while (rs.next()){
                Object[] res = new Object[9];
                res[0] = rs.getInt(1);//id
                res[1] = rs.getString(2);//username
                //System.out.println("name la:"+rs.getString(2));
                res[2] = rs.getString(3);//password
                res[3] = rs.getString(4);//name
                res[4] = rs.getString(5);//email
                res[5] = rs.getInt(6);//status
                res[6] = rs.getString(7);//image
                res[7] = rs.getFloat(8);//floatX
                res[8] = rs.getFloat(9);//floatY
                user_list.add(res);
            }
            
            return user_list;
        } catch (SQLException sqle) {
            System.err.println(sqle.getMessage());
        }
        return null;
    }
    
    public List<Object[]> getallImage(String username){
        try {
            String SQL = "SELECT image, title, description, id  FROM public.images where username='"+ username +"';";
            Statement stmt = this.dbConnection.createStatement();
            ResultSet rs = stmt.executeQuery(SQL);
            
            // Iterate through the data in the result set and display it.
            List<Object[]> img_list=new ArrayList<Object[]>();
            while (rs.next()){
                Object[] res = new Object[4];
                res[0] = rs.getString(1);//id
                res[1] = rs.getString(2);//username
                //System.out.println("name la:"+rs.getString(2));
                res[2] = rs.getString(3);//password
                res[3] = rs.getInt(4);//password
                img_list.add(res);
            }
            
            return img_list;
        } catch (SQLException sqle) {
            System.err.println(sqle.getMessage());
        }
        return null;
    }
    
    public String update(int id,String name, String email, String password, String image){
        try{
          
            String SQL="Update public.users SET "
                    + "name = '"+name+"',"
                    + "email='"+email+"',"
                    + "password='"+password+"'";
            if( image != null && image != "null")
                SQL = SQL + ",image='"+image+"'";
            SQL =SQL + " where id = "+id;
            Statement stmt = this.dbConnection.createStatement();
            stmt.executeUpdate(SQL);
            System.out.println();
           return "1";
        }
        catch (SQLException e){
            System.err.println(e.getMessage());
            return "2";
        }
        finally{
            if (this.dbConnection != null) {
                try {
                    this.dbConnection.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
        }
    }
    
    public String checkUser(String username, String password) {
        try {
            System.out.printf(username+":"+password);
            if (username != null && password != null) {
                String SQL = "SELECT username,password, id, status FROM public.users  WHERE username = '" + username + "' AND password = '" + password + "';";
                Statement stmt = this.dbConnection.createStatement();
                ResultSet rs = stmt.executeQuery(SQL);

                // Iterate through the data in the result set and display it.  
                if (rs.next()) {
                  int id = rs.getInt("status");
                  return String.valueOf(id);
                } else {
                    System.out.printf(username+":"+password);
                    return "0";
                }
            }
        } catch (SQLException sqle) {
            System.err.println(sqle.getMessage());
        } finally {
            if (this.dbConnection != null) {
                try {
                    this.dbConnection.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
        }
        return null;
    }
    
    public String insertUser(String username, String password, String email, String name, String image){
        try{
            String SQL="INSERT INTO public.users(username,password,email,name,image) VALUES ('"+username+"','"+password
                    +"','"+email+"','"+name+"','"+image+"');";
            Statement stmt = this.dbConnection.createStatement();
            stmt.executeUpdate(SQL);
           return "1";
        }
        catch (SQLException e){
            System.err.println(e.getMessage());
            return "2";
        }
        finally{
            if (this.dbConnection != null) {
                try {
                    this.dbConnection.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
        }
    }
    
    public String insertImage(String username,String image,String title, String des){
        try{
            String SQL="INSERT INTO public.images(username,image,title,description) VALUES ('"+username+"','"+image+"','"+title+"','"+des+"');";
            Statement stmt = this.dbConnection.createStatement();
            stmt.executeUpdate(SQL);
           return "1";
        }
        catch (SQLException e){
            System.err.println(e.getMessage());
            return "2";
        }
        finally{
            if (this.dbConnection != null) {
                try {
                    this.dbConnection.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
        }
    }
    
    public String deleteUser(int id){
        try{
            String SQL="DELETE FROM PUBLIC.USERS WHERE ID ="+id+";";
            Statement stmt = this.dbConnection.createStatement();
            stmt.executeUpdate(SQL);
           return "1";
        }
        catch (SQLException e){
            System.err.println(e.getMessage());
            return "2";
        }
        finally{
            if (this.dbConnection != null) {
                try {
                    this.dbConnection.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
        }
    }
    
      public String deleteImage(int id, String username){
        try{
            String SQL="DELETE FROM PUBLIC.IMAGES WHERE ID ="+id+" and username = '"+username+"';";
            Statement stmt = this.dbConnection.createStatement();
            stmt.executeUpdate(SQL);
           return "1";
        }
        catch (SQLException e){
            System.err.println(e.getMessage());
            return "2";
        }
        finally{
            if (this.dbConnection != null) {
                try {
                    this.dbConnection.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
        }
    }
      
    private static Timestamp getTimeStampOfDate(Date date) {
        if (date != null) {
            return new Timestamp(date.getTime());
        }
        return null;
    }

    public boolean executeSQL(String sql) {
        Connection con = null;
        PreparedStatement preparedStatement = null;

        try {
            preparedStatement = this.dbConnection.prepareStatement(sql);
            // execute insert SQL stetement
            if (preparedStatement != null) {
                int res = preparedStatement.executeUpdate();
                return res == 1;
            }
        } catch (SQLException sqle) {
            System.err.println(sqle.getMessage());
        } finally {
            if (preparedStatement != null) {
                try {
                    preparedStatement.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
            if (con != null) {
                try {
                    con.close();
                } catch (SQLException sqle) {
                    System.err.println(sqle.getMessage());
                }
            }
        }
        return false;
    }
}
