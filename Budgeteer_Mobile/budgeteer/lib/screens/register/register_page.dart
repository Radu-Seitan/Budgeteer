import 'package:budgeteer/screens/login/login_page.dart';
import 'package:budgeteer/screens/send_photo/send_photo_page.dart';
import 'package:flutter/material.dart';
import 'package:budgeteer/components/my_button.dart';
import 'package:budgeteer/components/my_textfield.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';  // For json encoding and decoding
import 'package:budgeteer/auth/auth_service.dart'; // Import the AuthService singleton


class RegisterPage extends StatelessWidget {
  RegisterPage({super.key});

  // text editing controllers
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  // sign user in method
  void registerUser(BuildContext context) async {
    final email = emailController.text;
    final password = passwordController.text;

    final url = Uri.parse('http://10.0.2.2:5030/api/auth/register');  // Replace with your .NET backend URL

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
        final responseBody = json.decode(response.body);
        final String token = responseBody['tk'];
        AuthService().setToken(token); // Store the token using the singleton
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const SendPhotoPage()),
        );
      } else {
        // Handle registration failure
        showDialog(
          context: context,
          builder: (context) {
            return AlertDialog(
              title: const Text('Registration Failed'),
              content: const Text('Could not register. Please try again.'),
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
  void navigateToLoginPage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => LoginPage()),
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

              // welcome back, you've been missed!
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
                onTap: () => registerUser(context),
                text: "Sign Up",
              ),

              const SizedBox(height: 10),

              MyButton(
                onTap: () => navigateToLoginPage(context),
                text: "Already have an account? Sign in here",
              ),

              const SizedBox(height: 50)
            ],
          ),
        ),
      ),
    );
  }
}