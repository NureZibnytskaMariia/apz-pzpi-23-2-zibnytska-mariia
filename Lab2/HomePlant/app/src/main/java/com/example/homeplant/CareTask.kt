package com.example.homeplant

import com.google.gson.annotations.SerializedName

data class CareLogModel(
    @SerializedName("id") val id: Int,
    @SerializedName("user_plant") val userPlantId: Int,
    @SerializedName("plant_name") val plantName: String,
    @SerializedName("plant_location") val plantLocation: String?,
    @SerializedName("scheduled_date") val scheduledDate: String,
    @SerializedName("task_type") val taskType: String,
    @SerializedName("task_type_display") val taskTypeDisplay: String,
    @SerializedName("is_completed") var isCompleted: Boolean,
    @SerializedName("completed_at") val completedAt: String?,
    @SerializedName("skipped") val skipped: Boolean,
    @SerializedName("auto_adjusted") val autoAdjusted: Boolean,
    @SerializedName("notes") val notes: String?,
    @SerializedName("is_overdue") val isOverdue: Boolean,
    @SerializedName("created_at") val createdAt: String
)