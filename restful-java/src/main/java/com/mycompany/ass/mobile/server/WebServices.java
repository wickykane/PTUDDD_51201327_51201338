/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.ass.mobile.server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import sun.misc.BASE64Decoder;

/**
 *
 * @author DRAGON
 */
@Path("DoubleH")
public class WebServices {
    String Host = "ec2-54-243-239-181.compute-1.amazonaws.com";
    String Database = "dgvnbtvdqn24j";
    String User = "soiibjhohsgyzz";
    String Password = "s2sJheG2wPZsCOcuiPoofgPbPS";
        
    @GET
    @Path("getuser/{id}")
    public Response get1User(@PathParam("id") int id) {
        //GET JSON OBJECT
        System.out.println("Have connect get 1 user!");
        ConnectToSQL a = new ConnectToSQL(ConnectToSQL.POSTGRESQL, Host, Database, User, Password);
        Object[] out = a.getUser2(id);
        User user = new User();
        user.setId((int) out[0]);
        user.setUsername((String) out[1]);
        user.setPassword((String) out[2]);
        user.setName((String) out[3]);
        user.setEmail((String) out[4]);
        user.setStatus((int) out[5]);
        user.setImage((String) out[6]);
        user.setFloatX((float) out[7]);
        user.setFloatY((float) out[8]);
        return Response.status(200).entity(new GenericEntity<User>(user) {
        })
                //.header("Access-Control-Allow-Origin", "*")
                //.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .build();
    }
    
    @POST
    @Path("getuser")
    public Response get1UserFromUsernamePass(User ur) {
        //GET JSON OBJECT
        System.out.println("Have connect get 1 user!");
        ConnectToSQL a = new ConnectToSQL(ConnectToSQL.POSTGRESQL, Host, Database, User, Password);
        Object[] out = a.getUser3(ur.getUsername(),ur.getPassword());
        User user = new User();
        user.setId((int) out[0]);
        user.setUsername((String) out[1]);
        user.setPassword((String) out[2]);
        user.setName((String) out[3]);
        user.setEmail((String) out[4]);
        user.setStatus((int) out[5]);
        user.setImage((String) out[6]);
        user.setFloatX((float) out[7]);
        user.setFloatY((float) out[8]);
        return Response.status(200).entity(new GenericEntity<User>(user) {
        })
                //.header("Access-Control-Allow-Origin", "*")
                //.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .build();
    }
    
    @GET
    @Path("getuser/all")
    public Response getAllUser(@Context HttpHeaders headers) throws IOException {
        System.out.println("Have connect get all user!");
        ConnectToSQL a = new ConnectToSQL(ConnectToSQL.POSTGRESQL, Host, Database, User, Password);
        //GET STRING
        /*String out = a.getUser(id);
        return Response.status(200).entity(out).build();*/
        //==================================================
        //GET JSON OBJECT
        /*Object[] out = a.getUser2(id);
        User user=new User();
        user.setId((int) out[0]);
        user.setUsername((String) out[1]);
        user.setEmail((String) out[2]);
        user.setName((String) out[3]);
        user.setStatus((int) out[4]);
        return Response.status(200).entity(new GenericEntity<User>(user){}).build();*/
        //==================================================
        //GET JSON LIST
        List<Object[]> obj_list = a.getall();
        List<User> user_list = new ArrayList<User>();
        for (Object[] o : obj_list) {
            User user = new User();
            user.setId((int) o[0]);
            user.setUsername((String) o[1]);
            user.setPassword((String) o[2]);
            user.setName((String) o[3]);
            user.setEmail((String) o[4]);
            user.setStatus((int) o[5]);
            user.setImage((String) o[6]);
            user.setFloatX((float) o[7]);
            user.setFloatY((float) o[8]);
            //if (user.getStatus()==3) user_list.add(user);
            user_list.add(user);
        }
        //GET username-pasword=======================
        String auth = headers.getRequestHeader("Authorization").get(0);
        String userpassEncoded = auth.replaceFirst("Basic" + " ", "");
        //String userpassEncoded = auth.substring(6);
        BASE64Decoder dec = new BASE64Decoder();
        String userpassDecode = new String(dec.decodeBuffer(userpassEncoded));
        //System.out.print(userpassEncoded+"_"+userpassDecode);
        StringTokenizer token = new StringTokenizer(userpassDecode, ":");
        String username = token.nextToken();
        String password = token.nextToken();
        for (Object[] o : obj_list) {
            if (username.equals(o[1]) && password.equals(o[2])) {
                if ((int) o[5] == 3) {
                    return Response.status(200)
                            .entity(new GenericEntity<List<User>>(user_list) {
                            })
                            //.header("Access-Control-Allow-Origin", "*")
                            //.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                            .build();
                } else {
                    return Response.status(401).entity("Role not permitted to access")
                            //.header("Access-Control-Allow-Origin", "*")
                            //.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                            .build();
                }
            }
        }
        return Response.status(401).entity("Account not exist")
                //.header("Access-Control-Allow-Origin", "*")
                //.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .build();
    }
    
    @POST
    @Path("getimage")
    public Response getAllImage(Images img)  {
        System.out.println("Have connect get all image!");
        ConnectToSQL a = new ConnectToSQL(ConnectToSQL.POSTGRESQL, Host, Database, User, Password);
        List<Object[]> obj_list = a.getallImage(img.getUsername());
        List<Images> img_list = new ArrayList<Images>();
        for (Object[] o : obj_list) {
            Images im = new Images();
            im.setImage((String) o[0]);
            im.setTitle((String) o[1]);
            im.setDes((String) o[2]);
            im.setId((Integer) o[3]);
            img_list.add(im);
        }
     return Response.status(200).entity(new GenericEntity<List<Images>>(img_list) {
                            }).build();
               
    }

    @GET
    @Path("user/signup")
    public Response CheckSignIn(@Context HttpHeaders headers) throws IOException {
        System.out.println("Have connect sign up!");
        ConnectToSQL a = new ConnectToSQL(ConnectToSQL.POSTGRESQL, Host, Database, User, Password);
        //ConnectToSQL a = new ConnectToSQL(ConnectToSQL.POSTGRESQL,"localhost:5432","postgres", "postgres", "123");
        String auth = headers.getRequestHeader("Authorization").get(0);
        String userpassEncoded = auth.replaceFirst("Basic" + " ", "");
        //String userpassEncoded = auth.substring(6);
        BASE64Decoder dec = new BASE64Decoder();
        String userpassDecode = new String(dec.decodeBuffer(userpassEncoded));
        //System.out.print(userpassEncoded+"_"+userpassDecode);
        StringTokenizer token = new StringTokenizer(userpassDecode, ":");
        String username = token.nextToken();
        String password = token.nextToken();
        String result = a.checkUser(username, password);
        return Response.status(200).entity(result)
                //.header("Access-Control-Allow-Origin", "*")
                //.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .build();
    }

    @PUT
    @Path("update")
    public Response Update(User ur) {
        System.out.println("Have connect update!");
        ConnectToSQL a = new ConnectToSQL(ConnectToSQL.POSTGRESQL, Host, Database, User, Password);
        String result = a.update(ur.getId(), ur.getName(), ur.getEmail(), ur.getPassword(), ur.getImage());
        return Response.status(200).entity(result)
                //.header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .build();
    }

    @POST
    @Path("add")
    public Response Insert(User ur) {
        System.out.println("Have connect add!");
        ConnectToSQL a = new ConnectToSQL(ConnectToSQL.POSTGRESQL, Host, Database, User, Password);
        String check = a.checkUser(ur.getUsername(), ur.getPassword());
        a = new ConnectToSQL(ConnectToSQL.POSTGRESQL, Host, Database, User, Password);
        String result;
        if (check.equals("0"))result = a.insertUser(ur.getUsername(), ur.getPassword(), ur.getEmail(),ur.getName(), ur.getImage());
        else result ="0";
        return Response.status(200).entity(result).build();
    }
    
    @POST
    @Path("upload")
    public Response InsertImage(Images ur) {
        System.out.println("Have connect add!");
        ConnectToSQL a = new ConnectToSQL(ConnectToSQL.POSTGRESQL, Host, Database, User, Password);
        //String check = a.checkUser(ur.getUsername(), ur.getPassword());
        a = new ConnectToSQL(ConnectToSQL.POSTGRESQL, Host, Database, User, Password);
        String result;
        result = a.insertImage(ur.getUsername(),ur.getImage(),ur.getTitle(),ur.getDes());
       // else result ="0";
        return Response.status(200).entity(result).build();
    }
    
    @POST
    @Path("delete")
    public Response Delete(User ur) {
        System.out.println("Have connect delete!");
        ConnectToSQL a = new ConnectToSQL(ConnectToSQL.POSTGRESQL, Host, Database, User, Password);
        String result;
        if(ur.getStatus()== 3 ) result = "0";
        else  result = a.deleteUser(ur.getId());
        return Response.status(200).entity(result).build();
    }
    
    @POST
    @Path("deleteimage")
    public Response DeleteImage(Images img) {
        System.out.println("Have connect delete!");
        ConnectToSQL a = new ConnectToSQL(ConnectToSQL.POSTGRESQL, Host, Database, User, Password);
        String result;
        result = a.deleteImage(img.getId(),img.getUsername());
        
        return Response.status(200).entity(result).build();
    }
    
}
