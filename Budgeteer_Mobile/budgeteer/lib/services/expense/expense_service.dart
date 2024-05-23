import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:budgeteer/services/auth/auth_service.dart';

class ExpenseService {
  static Future<List<dynamic>> fetchExpense() async {
    final String? token = AuthService().token;
    final response = await http.get(
      Uri.parse('http://34.118.82.150:5030/api/expenses'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load income data');
    }
  }
}
