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
import com.google.android.material.floatingactionbutton.FloatingActionButton
import android.util.Log
import android.content.Intent

class HomeFragment : Fragment() {

    private lateinit var tokenManager: TokenManager

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        tokenManager = TokenManager(requireContext())

        val rvPlants = view.findViewById<RecyclerView>(R.id.rvPlants)
        rvPlants.layoutManager = LinearLayoutManager(requireContext())

        loadPlants(rvPlants)

        val fabAdd = view.findViewById<FloatingActionButton>(R.id.fabAddPlant)
        fabAdd.setOnClickListener {
            val intent = Intent(requireContext(), AddPlantActivity::class.java)
            startActivity(intent)
        }
    }

    private fun loadPlants(recyclerView: RecyclerView) {
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
                    Log.e("API_ERROR", "Помилка завантаження: ${response.code()}")
                }
            }

            override fun onFailure(call: Call<PlantListResponse>, t: Throwable) {
                Log.e("API_ERROR", "Помилка мережі: ${t.message}")
            }
        })
    }

}