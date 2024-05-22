import 'dart:convert';
import 'package:budgeteer/components/my_button.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:budgeteer/services/auth/auth_service.dart';

class IncomePage extends StatefulWidget {
  const IncomePage({super.key});

  @override
  State<IncomePage> createState() => _IncomePageState();
}

class _IncomePageState extends State<IncomePage> {
  final TextEditingController incomeController = TextEditingController();
  final String _title = 'Add Income';

  List<String> categories = [
    'Salary',
    'Stocks',
    'Sales',
    'CryptoCurrency',
    'Gambling',
    'Other'
  ];
  String? dropdownValue;

  Future postIncome(double quantity) async {
    final String? token = AuthService().token;
    late int categoryInt;
    switch (dropdownValue) {
      case 'Salary':
        {
          categoryInt = 0;
        }
        break;

      case 'Stocks':
        {
          categoryInt = 1;
        }
        break;

      case 'Sales':
        {
          categoryInt = 2;
        }
        break;

      case 'CryptoCurrency':
        {
          categoryInt = 3;
        }
        break;

      case 'Gambling':
        {
          categoryInt = 4;
        }
        break;

      case 'Other':
        {
          categoryInt = 5;
        }
        break;
    }
    try {
      // call backend api and post user entity in db
      var response = await post(
        Uri.parse('http://10.0.2.2:5030/api/incomes'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(
          <String, Object?>{
            'quantity': quantity,
            'category': categoryInt,
          },
        ),
      );
    } catch (ex) {
      throw Exception('Failed to post income.');
    }
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_title),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: incomeController,
              decoration: const InputDecoration(
                labelText: 'Income',
              ),
            ),
          ),

          const SizedBox(height: 10),

          DropdownButton<String>(
            hint: const Text('Category'),
            value: dropdownValue,
            elevation: 16,
            items: categories.map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
            onChanged: (String? newValue) {
              setState(() {
                dropdownValue = newValue!;
              });
            },
          ),

          const SizedBox(height: 25),

          MyButton(
            text:'Add income',
            onTap: () async {
              await postIncome(
                double.parse(incomeController.text),
              );
              Navigator.pushNamed(context, '/display_income');
            },
          )
        ],
      ),
    );
  }
}