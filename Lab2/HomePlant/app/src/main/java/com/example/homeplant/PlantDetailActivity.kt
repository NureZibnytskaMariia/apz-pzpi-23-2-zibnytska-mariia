package com.example.homeplant

import android.os.Bundle
import android.widget.ImageButton
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class PlantDetailActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_plant_detail)

        val tvName = findViewById<TextView>(R.id.tvDetailCustomName)
        val tvDescription = findViewById<TextView>(R.id.tvDetailDescription)
        val tvWatering = findViewById<TextView>(R.id.tvDetailWatering)
        val tvCareTips = findViewById<TextView>(R.id.tvDetailCareTips)

        val btnBack = findViewById<ImageButton>(R.id.btnBack)

        val name = intent.getStringExtra("PLANT_NAME")
        val description = intent.getStringExtra("DESCRIPTION")
        val watering = intent.getIntExtra("WATERING_FREQ", 0)
        val careTips = intent.getStringExtra("CARE_TIPS")

        tvName.text = name
        tvDescription.text = description
        tvWatering.text = "Полив кожні: $watering днів"
        tvCareTips.text = "Поради: $careTips"

        btnBack.setOnClickListener {
            finish()
        }
    }
}