import 'package:flutter_sound/flutter_sound.dart';
import 'dart:io';

class AudioRecorderService {
  final FlutterSoundRecorder _recorder = FlutterSoundRecorder();
  String? _path;

  Future<void> init() async {
    await _recorder.openRecorder();
  }

  Future<void> start() async {
    _path = '/tmp_recording.m4a';
    await _recorder.startRecorder(toFile: _path, codec: Codec.aacMP4);
  }

  Future<File?> stop() async {
    final result = await _recorder.stopRecorder();
    if (result == null) return null;
    return File(result);
  }
}
