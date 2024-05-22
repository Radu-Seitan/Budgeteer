class AuthService {
  static final AuthService _instance = AuthService._internal();

  String? _token;

  factory AuthService() {
    return _instance;
  }

  AuthService._internal();

  void setToken(String token) {
    _token = token;
  }

  String? get token => _token;
}
