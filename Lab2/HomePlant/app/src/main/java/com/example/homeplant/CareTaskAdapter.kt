package com.example.homeplant

import android.graphics.Paint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CheckBox
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CareTaskAdapter(private val taskList: List<CareLogModel>) :
    RecyclerView.Adapter<CareTaskAdapter.TaskViewHolder>() {

    class TaskViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val viewIndicator: View = itemView.findViewById(R.id.viewTaskCategoryIndicator)
        val tvIcon: TextView = itemView.findViewById(R.id.tvTaskIcon)
        val tvPlantNameTask: TextView = itemView.findViewById(R.id.tvPlantNameTask)
        val tvTaskVolume: TextView = itemView.findViewById(R.id.tvTaskVolume)
        val cbDone: CheckBox = itemView.findViewById(R.id.cbTaskDone)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TaskViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_care_task, parent, false)
        return TaskViewHolder(view)
    }

    override fun onBindViewHolder(holder: TaskViewHolder, position: Int) {
        val task = taskList[position]

        holder.tvIcon.text = when (task.taskType) {
            "watering" -> "💧"
            "fertilizing" -> "🌸"
            "repotting" -> "🪴"
            else -> "📋"
        }

        val indicatorColor = when (task.taskType) {
            "watering" -> android.R.color.holo_green_dark
            "fertilizing" -> android.R.color.holo_orange_dark
            else -> android.R.color.darker_gray
        }
        holder.viewIndicator.setBackgroundColor(
            ContextCompat.getColor(holder.itemView.context, indicatorColor)
        )

        holder.tvPlantNameTask.text = "${task.taskTypeDisplay} ${task.plantName}"
        updateStrikeThrough(holder.tvPlantNameTask, task.isCompleted)

        holder.tvTaskVolume.text = if (task.taskType == "watering") "Рекомендовано: 250 мл" else task.plantName

        holder.cbDone.setOnCheckedChangeListener(null)
        holder.cbDone.isChecked = task.isCompleted

        holder.cbDone.setOnCheckedChangeListener { _, isChecked ->
            val token = "Bearer ${TokenManager(holder.itemView.context).getAccessToken()}"
            val body = emptyMap<String, String>()

            RetrofitClient.instance.completeTask(token, task.id, body).enqueue(object : Callback<Void> {
                override fun onResponse(call: Call<Void>, response: Response<Void>) {
                    if (response.isSuccessful) {
                        task.isCompleted = isChecked
                        updateStrikeThrough(holder.tvPlantNameTask, isChecked)
                    } else {
                        holder.cbDone.isChecked = !isChecked
                    }
                }

                override fun onFailure(call: Call<Void>, t: Throwable) {
                    holder.cbDone.isChecked = !isChecked
                }
            })
        }
    }

    private fun updateStrikeThrough(textView: TextView, isDone: Boolean) {
        if (isDone) {
            textView.paintFlags = textView.paintFlags or Paint.STRIKE_THRU_TEXT_FLAG
        } else {
            textView.paintFlags = textView.paintFlags and Paint.STRIKE_THRU_TEXT_FLAG.inv()
        }
    }

    override fun getItemCount(): Int = taskList.size
}