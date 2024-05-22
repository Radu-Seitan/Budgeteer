import 'package:budgeteer/screens/home/home_page.dart';
import 'package:budgeteer/screens/register/register_page.dart';
import 'package:flutter/material.dart';
import 'package:budgeteer/components/my_button.dart';
import 'package:budgeteer/components/my_textfield.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';  // For json encoding and decoding
import 'package:budgeteer/services/auth/auth_service.dart'; // Import the AuthService singleton


class LoginPage extends StatelessWidget {
  LoginPage({super.key});

  // text editing controllers
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  // sign user in method
  void signUserIn(BuildContext context) async {
    final email = emailController.text;
    final password = passwordController.text;

    final url = Uri.parse('http://10.0.2.2:5030/api/auth/login');  // Replace with your .NET backend URL

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        // Assuming a successful login response
        final responseBody = json.decode(response.body);
        final String token = responseBody['tk'];
        AuthService().setToken(token); // Store the token using the singleton
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const HomePage()),
        );
      } else {
        // Handle login failure
        showDialog(
          context: context,
          builder: (context) {
            return AlertDialog(
              title: const Text('Login Failed'),
              content: const Text('Invalid email or password.'),
              actions: <Widget>[
                TextButton(
                  child: const Text('OK'),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                ),
              ],
            );
          },
        );
      }
    } catch (e) {
      // Handle network error
      showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: const Text('Error'),
            content: const Text('Could not connect to the server.'),
            actions: <Widget>[
              TextButton(
                child: const Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );
    }
  }

  // navigate to register page
  void navigateToRegisterPage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => RegisterPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(height: 50),

              // logo
              Image.asset(
                'lib/assets/icons/logo-bud.png',
                height: 200,
              ),

              const SizedBox(height: 5),

              // welcome!
              Text(
                'Welcome!',
                style: TextStyle(
                  color: Colors.grey[700],
                  fontSize: 16,
                ),
              ),

              const SizedBox(height: 25),

              // email textfield
              MyTextField(
                controller: emailController,
                hintText: 'Email',
                obscureText: false,
              ),

              const SizedBox(height: 10),

              // password textfield
              MyTextField(
                controller: passwordController,
                hintText: 'Password',
                obscureText: true,
              ),

              const SizedBox(height: 10),

              const SizedBox(height: 25),

              // sign in button
              MyButton(
                onTap: () => signUserIn(context),
                text: "Sign In",
              ),

              const SizedBox(height: 10),

              // navigate to register button
              MyButton(
                onTap: () => navigateToRegisterPage(context),
                text: "Need an account? Register here",
              ),

              const SizedBox(height: 50)
            ],
          ),
        ),
      ),
    );
  }
}