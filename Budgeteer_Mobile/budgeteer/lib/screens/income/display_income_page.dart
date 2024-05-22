import 'package:budgeteer/services/income/income_service.dart';
import 'package:flutter/material.dart';

class DisplayIncomePage extends StatefulWidget {
  const DisplayIncomePage({super.key});

  @override
  _DisplayIncomePageState createState() => _DisplayIncomePageState();
}

class _DisplayIncomePageState extends State<DisplayIncomePage> {
  Future<List<dynamic>>? _incomeData;
  static const add_box_rounded = IconData(0xf529, fontFamily: 'MaterialIcons');

  @override
  void initState() {
    super.initState();
    _incomeData = IncomeService.fetchIncome();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Income'),
        actions: <Widget>[
          IconButton(
            onPressed: () => {
              Navigator.pushNamed(context, '/income')
            },
            icon: const Icon(add_box_rounded),
          )
       ]
      ),
      body: FutureBuilder<List<dynamic>>(
        future: _incomeData,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No income data available'));
          } else {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                final income = snapshot.data![index];
                return Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10.0),
                    side: const BorderSide(
                      color: Colors.grey,
                      width: 1.0,
                    ),
                  ),
                  margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                  child: ListTile(
                    title: Text(income['category']),
                    trailing: Text('${income['quantity']}\u0024'),
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
