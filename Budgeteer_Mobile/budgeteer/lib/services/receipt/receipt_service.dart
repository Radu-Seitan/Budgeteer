import 'dart:convert';
import 'dart:io';
import '../auth/auth_service.dart';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart'; // For MediaType

class ReceiptService {
  static const String baseUrl = 'http://10.0.2.2:5030/api/';
  static const String urlPath = 'receipts/scan-and-save';

  Future<String> scanAndSaveProducts(File imageFile, String categories) async {
    final String? token = AuthService().token;
    final uri = Uri.parse(baseUrl + urlPath);
    final request = http.MultipartRequest('POST', uri,)
      ..fields['categories'] = categories
      ..files.add(await http.MultipartFile.fromPath(
        'image',
        imageFile.path,
        contentType: MediaType('image', 'jpeg'),
      ));

    request.headers.addAll({
      'Authorization': 'Bearer $token',
      'Content-Type': 'multipart/form-data',
    });

    final response = await request.send();

    if (response.statusCode == 200) {
      final responseData = await http.Response.fromStream(response);
      return jsonDecode(responseData.body);
    } else {
      throw Exception('Failed to upload image');
    }
  }
}