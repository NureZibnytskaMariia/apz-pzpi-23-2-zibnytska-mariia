package com.example.homeplant

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView

data class Plant(
    val name: String,
    val status: String,
    val statusColorRes: Int,
    val wateringFrequency: Int,
    val fertilizingFrequency: Int,
    val description: String,
    val careTips: String
)

class PlantAdapter(private val plantList: List<Plant>) : RecyclerView.Adapter<PlantAdapter.PlantViewHolder>() {

    class PlantViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvName: TextView = view.findViewById(R.id.tvPlantName)
        val tvStatus: TextView = view.findViewById(R.id.tvPlantStatusText)
        val viewIndicator: View = view.findViewById(R.id.viewStatusIndicator)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PlantViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_plant, parent, false)
        return PlantViewHolder(view)
    }

    override fun onBindViewHolder(holder: PlantViewHolder, position: Int) {
        val plant = plantList[position]
        holder.tvName.text = plant.name
        holder.tvStatus.text = plant.status

        holder.viewIndicator.setBackgroundColor(
            ContextCompat.getColor(holder.itemView.context, plant.statusColorRes)
        )

        holder.itemView.setOnClickListener {
            val context = holder.itemView.context
            val intent = Intent(context, PlantDetailActivity::class.java).apply {
                putExtra("PLANT_NAME", plant.name)
                putExtra("PLANT_STATUS", plant.status)
                putExtra("WATERING_FREQ", plant.wateringFrequency)
                putExtra("FERTIL_FREQ", plant.fertilizingFrequency)
                putExtra("DESCRIPTION", plant.description)
                putExtra("CARE_TIPS", plant.careTips)
            }
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int = plantList.size
}