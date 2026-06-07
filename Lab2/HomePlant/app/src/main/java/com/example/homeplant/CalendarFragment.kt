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
import java.util.Calendar

class CalendarFragment : Fragment() {

    private lateinit var tokenManager: TokenManager

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_calendar, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        tokenManager = TokenManager(requireContext())

        val rvTasks = view.findViewById<RecyclerView>(R.id.rvCareTasks)
        rvTasks.layoutManager = LinearLayoutManager(requireContext())

        loadTasks(rvTasks)
    }

    private fun loadTasks(recyclerView: RecyclerView) {
        val token = "Bearer ${tokenManager.getAccessToken()}"

        val calendar = Calendar.getInstance()
        val year = calendar.get(Calendar.YEAR)
        val month = calendar.get(Calendar.MONTH) + 1

        RetrofitClient.instance.getMonthlyTasks(token, year, month).enqueue(object : Callback<List<CareLogModel>> {
            override fun onResponse(call: Call<List<CareLogModel>>, response: Response<List<CareLogModel>>) {
                if (response.isSuccessful && response.body() != null) {
                    val tasks = response.body()!!
                    recyclerView.adapter = CareTaskAdapter(tasks)
                } else {
                    android.util.Log.e("Calendar", "Помилка сервера: ${response.code()}")
                }
            }

            override fun onFailure(call: Call<List<CareLogModel>>, t: Throwable) {
                android.util.Log.e("Calendar", "Помилка завантаження: ${t.message}")
            }
        })
    }
}