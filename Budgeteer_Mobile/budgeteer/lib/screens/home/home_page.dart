import 'package:budgeteer/components/my_button.dart';
import 'package:flutter/material.dart';
import 'package:budgeteer/services/auth/auth_service.dart';

class HomePage extends StatelessWidget {
  final String _title = 'Budgeteer';

  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final String? token = AuthService().token;

    return Scaffold(
      appBar: AppBar(
        title: Text(_title),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          MyButton(
            text: 'Income',
            onTap: () {
              Navigator.pushNamed(context, '/display_income');
            },
          ),
          MyButton(
            text: 'Expense',
            onTap: () {
              Navigator.pushNamed(context, '/expense');
            },
          ),
          MyButton(
            text: 'Upload photo',
            onTap: () {
              Navigator.pushNamed(context, '/send_photo');
            },
          ),
        ],
      ),
    );
  }
}