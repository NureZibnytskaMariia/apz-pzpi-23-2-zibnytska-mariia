package com.example.homeplant

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ProfileFragment : Fragment() {

    private lateinit var tvAvatarInitials: TextView
    private lateinit var tvUserName: TextView
    private lateinit var tvUserEmail: TextView
    private lateinit var badgePremium: TextView
    private lateinit var tvCountPlants: TextView
    private lateinit var tvCountWaterings: TextView
    private lateinit var tvCountDays: TextView
    private lateinit var tvPremiumStatusText: TextView

    private lateinit var tokenManager: TokenManager

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_profile, container, false)

        tokenManager = TokenManager(requireContext())

        tvAvatarInitials = view.findViewById(R.id.tvAvatarInitials)
        tvUserName = view.findViewById(R.id.tvUserName)
        tvUserEmail = view.findViewById(R.id.tvUserEmail)
        badgePremium = view.findViewById(R.id.badgePremium)
        tvCountPlants = view.findViewById(R.id.tvCountPlants)
        tvCountWaterings = view.findViewById(R.id.tvCountWaterings)
        tvCountDays = view.findViewById(R.id.tvCountDays)
        tvPremiumStatusText = view.findViewById(R.id.tvPremiumStatusText)

        if (tokenManager.isAuthorized()) {
            loadUserProfileData()
        } else {
            Toast.makeText(requireContext(), "Користувач не авторизований", Toast.LENGTH_SHORT).show()

        }

        view.findViewById<Button>(R.id.btnLogout).setOnClickListener {
            handleLogout()
        }

        return view
    }

    private fun loadUserProfileData() {
        val token = "Bearer ${tokenManager.getAccessToken()}"

        RetrofitClient.instance.getUserProfile(token).enqueue(object : Callback<UserProfileModel> {
            override fun onResponse(call: Call<UserProfileModel>, response: Response<UserProfileModel>) {
                if (response.isSuccessful && response.body() != null) {
                    val profile = response.body()!!

                    tvUserName.text = profile.username
                    tvUserEmail.text = profile.email

                    val words = profile.username.split(" ")
                    val initials = words.map { it.firstOrNull() ?: "" }.joinToString("").uppercase()
                    tvAvatarInitials.text = if (initials.isNotEmpty()) initials else "US"

                    if (profile.isPremiumActive) {
                        badgePremium.visibility = View.VISIBLE
                        tvPremiumStatusText.text = "Активна (до ${profile.premiumEndDate})"
                    } else {
                        badgePremium.visibility = View.GONE
                        tvPremiumStatusText.text = "Не підключена"
                    }
                }
            }

            override fun onFailure(call: Call<UserProfileModel>, t: Throwable) {
                Toast.makeText(context, "Помилка мережі профілю: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })

        RetrofitClient.instance.getUserStatistics(token).enqueue(object : Callback<UserStatisticsModel> {
            override fun onResponse(call: Call<UserStatisticsModel>, response: Response<UserStatisticsModel>) {
                if (response.isSuccessful && response.body() != null) {
                    val stats = response.body()!!
                    tvCountPlants.text = stats.totalPlants.toString()
                    tvCountWaterings.text = stats.completedTasks.toString()
                    tvCountDays.text = "${stats.premiumDaysLeft}"
                }
            }

            override fun onFailure(call: Call<UserStatisticsModel>, t: Throwable) {
                Toast.makeText(context, "Помилка завантаження статистики", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun handleLogout() {
        val token = "Bearer ${tokenManager.getAccessToken()}"
        val refreshToken = tokenManager.getRefreshToken() ?: ""

        val body = mapOf("refresh" to refreshToken)

        RetrofitClient.instance.logoutUser(token, body).enqueue(object : Callback<ResponseBody> {
            override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
                tokenManager.clearTokens()
                Toast.makeText(requireContext(), "Вихід успішний", Toast.LENGTH_SHORT).show()
                activity?.finish()
            }

            override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                tokenManager.clearTokens()
                activity?.finish()
            }
        })
    }
}