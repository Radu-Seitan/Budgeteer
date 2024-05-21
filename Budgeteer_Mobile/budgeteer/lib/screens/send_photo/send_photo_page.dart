import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class SendPhotoPage extends StatefulWidget {
  const SendPhotoPage({super.key});

  @override
  State<SendPhotoPage> createState() => _SendPhotoPageState();
}

class _SendPhotoPageState extends State<SendPhotoPage> {
  File? galleryFile;
  final picker = ImagePicker();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gallery and Camera Access'),
        backgroundColor: Colors.green,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              style: ButtonStyle(
                  backgroundColor: WidgetStateProperty.all(Colors.green)),
              child: const Text('Select photo from Gallery or Camera'),
              onPressed: () {
                _showPicker(context);
              },
            ),
            const SizedBox(
              height: 20,
            ),
            SizedBox(
              height: 200.0,
              width: 300.0,
              child: galleryFile == null
                  ? const Center(child: Text('Sorry, nothing selected!'))
                  : Image.file(galleryFile!),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 18.0),
            ),
            ElevatedButton(
              style: ButtonStyle(
                  backgroundColor: WidgetStateProperty.all(Colors.white70)),
              child: const Text('Send photo'),
              onPressed: () {
                // TODO: Send photo
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showPicker(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return SafeArea(
          child: Wrap(
            children: <Widget>[
              ListTile(
                leading: const Icon(Icons.photo_library),
                title: const Text('Photo Library'),
                onTap: () {
                  getImage(ImageSource.gallery);
                  Navigator.of(context).pop();
                },
              ),
              ListTile(
                leading: const Icon(Icons.photo_camera),
                title: const Text('Camera'),
                onTap: () {
                  getImage(ImageSource.camera);
                  Navigator.of(context).pop();
                },
              ),
            ],
          ),
        );
      },
    );
  }

  Future<void> getImage(ImageSource source) async {
    final pickedFile = await picker.pickImage(source: source);
    if (pickedFile != null) {
      setState(() {
        galleryFile = File(pickedFile.path);
      });
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Nothing is selected')),
      );
    }
  }
}