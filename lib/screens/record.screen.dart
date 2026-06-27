import 'package:flutter/material.dart';
import '../services/audio_recorder.dart';
import '../services/audio_uploader.dart';

class RecordScreen extends StatefulWidget {
  @override
  _RecordScreenState createState() => _RecordScreenState();
}

class _RecordScreenState extends State<RecordScreen> {
  final recorder = AudioRecorderService();
  final uploader = AudioUploader();
  bool recording = false;

  @override
  void initState() {
    super.initState();
    recorder.init();
  }

  void toggleRecord() async {
    if (!recording) {
      await recorder.start();
      setState(() => recording = true);
    } else {
      final file = await recorder.stop();
      setState(() => recording = false);

      if (file != null) {
        final result = await uploader.upload(file, "user123");
        print("Upload result: $result");
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Record Audio")),
      body: Center(
        child: ElevatedButton(
          onPressed: toggleRecord,
          child: Text(recording ? "Stop Recording" : "Start Recording"),
        ),
      ),
    );
  }
}
