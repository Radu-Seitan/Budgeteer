import 'dart:io';
import 'package:budgeteer/assets/core/custom_colors.dart';
import 'package:budgeteer/components/my_button.dart';
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
        title: const Text('Upload photo'),
        backgroundColor: CustomColors.theme,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            MyButton(
              onTap: () => _showPicker(context),
              text: "Select photo from Gallery or Camera",
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
            MyButton(
              onTap: () => _showPicker(context),
              text: "Send photo",
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