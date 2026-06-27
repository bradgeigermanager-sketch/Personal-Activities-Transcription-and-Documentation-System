import 'dart:io';
import 'package:http/http.dart' as http;

class AudioUploader {
  Future<String?> upload(File file, String userId) async {
    final uri = Uri.parse("http://localhost:4000/audio/upload");

    final request = http.MultipartRequest("POST", uri)
      ..headers["x-user-id"] = userId
      ..fields["device"] = "mobile"
      ..files.add(await http.MultipartFile.fromPath("file", file.path));

    final response = await request.send();

    if (response.statusCode == 200) {
      final body = await response.stream.bytesToString();
      return body;
    }

    return null;
  }
}
