import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:budgeteer/services/auth/auth_service.dart';

class CategoryService {
  static Future<List<dynamic>> fetchCategory() async {
    final String? token = AuthService().token;
    final response = await http.get(
      Uri.parse('http://10.0.2.2:5030/api/categories'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load category data');
    }
  }
}
