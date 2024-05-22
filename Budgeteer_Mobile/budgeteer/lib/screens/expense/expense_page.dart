import 'dart:convert';
import 'package:budgeteer/components/my_button.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:budgeteer/services/auth/auth_service.dart';

class ExpensePage extends StatefulWidget {
  const ExpensePage({super.key});

  @override
  State<ExpensePage> createState() => _ExpensePageState();
}

class _ExpensePageState extends State<ExpensePage> {
  final TextEditingController expenseController = TextEditingController();
  final String _title = 'Add Expense';

  List<String> categories = [
    'Bills',
    'Shopping',
    'Vacation',
    'Entertainment',
    'Stocks',
    'CryptoCurrency',
    'Other'
  ];
  String? dropdownValue;
  String? storeValue;
  List<dynamic>? stores;

  Future<List<dynamic>> _getStores() async {
    final String? token = AuthService().token;
    try {
      var response = await get(
        Uri.parse('http://10.0.2.2:5030/api/stores'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $token',
        }
      );
      var decodedBody = jsonDecode(response.body);
      stores = decodedBody;
      return decodedBody;
    } catch (ex) {
      throw Exception('Failed to get store.');
    }
  }

  Future postExpense(double quantity) async {
    final String? token = AuthService().token;
    late int categoryInt;
    var store = stores?.firstWhere((element) => element['name'] == storeValue);
    int? storeId = store['id'];
    switch (dropdownValue) {
      case 'Bills':
        {
          categoryInt = 0;
        }
        break;

      case 'Shopping':
        {
          categoryInt = 1;
        }
        break;

      case 'Vacation':
        {
          categoryInt = 2;
        }
        break;

      case 'Entertainment':
        {
          categoryInt = 3;
        }
        break;

      case 'Stocks':
        {
          categoryInt = 4;
        }
        break;

      case 'CryptoCurrency':
        {
          categoryInt = 5;
        }
        break;

      case 'Other':
        {
          categoryInt = 6;
        }
        break;
    }
    try {
      // call backend api and post user entity in db
      var response = await post(
        Uri.parse('http://10.0.2.2:5030/api/expenses'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(
          <String, Object?>{
            'quantity': quantity,
            'category': categoryInt,
            'storeId': storeId,
          },
        ),
      );
    } catch (ex) {
      throw Exception('Failed to post expenses.');
    }
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: _getStores(),
        builder: (BuildContext context, AsyncSnapshot<List<dynamic>> snapshot) {
          if (snapshot.hasData) {
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
                      controller: expenseController,
                      decoration: const InputDecoration(
                        labelText: 'Expense',
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

                  const SizedBox(height: 10),

                  DropdownButton<String>(
                    hint: const Text('Store'),
                    value: storeValue,
                    elevation: 16,
                    items: stores?.map<DropdownMenuItem<String>>((dynamic value) {
                      return DropdownMenuItem<String>(
                        value: value['name'],
                        child: Text(value['name']),
                      );
                    }).toList(),
                    onChanged: (String? newValue) {
                      setState(() {
                        storeValue = newValue!;
                      });
                    },
                  ),

                  const SizedBox(height: 25),

                  MyButton(
                    text:'Add Expense',
                    onTap: () async {
                      await postExpense(
                        double.parse(expenseController.text),
                      );
                      Navigator.pushNamed(context, '/display_expense');
                    },
                  )
                ],
              ),
            );
          } else {
            return const Center(child: CircularProgressIndicator());
        }
      }
    );
  }
}