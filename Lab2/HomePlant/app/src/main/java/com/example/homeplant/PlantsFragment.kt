package com.example.homeplant

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import android.util.Log

class PlantsFragment : Fragment() {

    private lateinit var tokenManager: TokenManager
    private lateinit var plantAdapter: PlantAdapter

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_plants, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        tokenManager = TokenManager(requireContext())

        val rvPlants = view.findViewById<RecyclerView>(R.id.rvAllUserPlants)
        rvPlants.layoutManager = LinearLayoutManager(requireContext())

        loadPlantsFromBackend(rvPlants)
    }

    private fun loadPlantsFromBackend(recyclerView: RecyclerView) {
        val token = "Bearer ${tokenManager.getAccessToken()}"

        RetrofitClient.instance.getUserPlants(token).enqueue(object : Callback<PlantListResponse> {
            override fun onResponse(call: Call<PlantListResponse>, response: Response<PlantListResponse>) {
                if (response.isSuccessful && response.body() != null) {
                    val plantModels = response.body()!!.results

                    val plants = plantModels.map { model ->
                        val type = model.plantTypeDetails

                        Plant(
                            name = model.customName,
                            status = "Стан: ${model.statusDisplay}",
                            statusColorRes = R.color.plant_primary,
                            wateringFrequency = type?.wateringFrequencyDays ?: 0,
                            fertilizingFrequency = type?.fertilizingFrequencyDays ?: 0,
                            description = type?.descriptionEn ?: "No description available",
                            careTips = type?.careTipsEn ?: "No care tips available"
                        )
                    }

                    recyclerView.adapter = PlantAdapter(plants)
                } else {
                    Log.e("API_ERROR", "Помилка: ${response.code()}")
                }
            }

            override fun onFailure(call: Call<PlantListResponse>, t: Throwable) {
                Log.e("API_ERROR", "Помилка мережі: ${t.message}")
            }
        })
    }
}