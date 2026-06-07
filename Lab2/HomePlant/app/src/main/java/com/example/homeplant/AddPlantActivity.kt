package com.example.homeplant

import android.app.DatePickerDialog
import android.os.Bundle
import android.util.Log
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.*

class AddPlantActivity : AppCompatActivity() {

    private lateinit var tokenManager: TokenManager
    private var plantTypesList: List<PlantType> = emptyList()
    private var selectedPlantTypeId: Int? = null

    private var waterDate: String = ""
    private var fertilizeDate: String = ""


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_plant)

        tokenManager = TokenManager(this)
        loadPlantTypes()

        findViewById<Button>(R.id.btnPickWaterDate).setOnClickListener { showDatePicker(true) }
        findViewById<Button>(R.id.btnPickFertilizeDate).setOnClickListener { showDatePicker(false) }

        findViewById<Button>(R.id.btnSavePlant).setOnClickListener {
            savePlant()
        }
    }

    private fun loadPlantTypes() {
        val token = "Bearer ${tokenManager.getAccessToken()}"
        RetrofitClient.instance.getPlantTypes(token).enqueue(object : Callback<PlantTypeResponse> {
            override fun onResponse(call: Call<PlantTypeResponse>, response: Response<PlantTypeResponse>) {
                if (response.isSuccessful && response.body() != null) {
                    plantTypesList = response.body()!!.results
                    val names = plantTypesList.map { "${it.nameEn} / ${it.nameUk}" }

                    val adapter = ArrayAdapter(this@AddPlantActivity, android.R.layout.simple_spinner_item, names)
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)

                    val spinner = findViewById<Spinner>(R.id.spinnerPlantType)
                    spinner.adapter = adapter

                    spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                        override fun onItemSelected(parent: AdapterView<*>?, view: android.view.View?, position: Int, id: Long) {
                            selectedPlantTypeId = plantTypesList[position].id
                        }
                        override fun onNothingSelected(parent: AdapterView<*>?) {}
                    }
                }
            }
            override fun onFailure(call: Call<PlantTypeResponse>, t: Throwable) { }
        })
    }

    private fun showDatePicker(isWatering: Boolean) {
        val calendar = Calendar.getInstance()
        DatePickerDialog(this, { _, year, month, day ->
            val dateStr = String.format("%04d-%02d-%02d", year, month + 1, day)
            if (isWatering) {
                waterDate = dateStr
                findViewById<Button>(R.id.btnPickWaterDate).text = "Полив: $waterDate"
            } else {
                fertilizeDate = dateStr
                findViewById<Button>(R.id.btnPickFertilizeDate).text = "Підживлення: $fertilizeDate"
            }
        }, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH)).show()
    }

    private fun savePlant() {
        Log.d("SAVE_DEBUG", "Кнопка натиснута!")

        val name = findViewById<EditText>(R.id.etCustomName).text.toString()
        val loc = findViewById<EditText>(R.id.etLocation).text.toString()

        Log.d("SAVE_DEBUG", "Name: $name, Date: $waterDate, TypeID: $selectedPlantTypeId")

        if (name.isEmpty() || selectedPlantTypeId == null || waterDate.isEmpty() || fertilizeDate.isEmpty()) {
            Log.e("SAVE_DEBUG", "Валідація не пройшла!")
            Toast.makeText(this, "Помилка: заповніть всі поля!", Toast.LENGTH_SHORT).show()
            return
        }

        val request = AddPlantRequest(selectedPlantTypeId!!, name, loc, waterDate, fertilizeDate)
        Log.d("SAVE_DEBUG", "Відправка запиту...")

        RetrofitClient.instance.createPlant("Bearer ${tokenManager.getAccessToken()}", request)
            .enqueue(object : Callback<PlantModel> {
                override fun onResponse(call: Call<PlantModel>, response: Response<PlantModel>) {
                    if (response.isSuccessful) {
                        Log.d("SAVE_DEBUG", "Успіх!")
                        finish()
                    } else {
                        Log.e("SAVE_DEBUG", "Помилка сервера: ${response.code()}")
                    }
                }
                override fun onFailure(call: Call<PlantModel>, t: Throwable) {
                    Log.e("SAVE_DEBUG", "Помилка мережі: ${t.message}")
                }
            })
    }
}