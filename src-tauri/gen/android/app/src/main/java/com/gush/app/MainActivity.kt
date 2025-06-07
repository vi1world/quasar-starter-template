package com.gush.app

import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.content.res.Configuration

class MainActivity : TauriActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Always use black status bar to match your app theme
        window.statusBarColor = Color.BLACK

        // Set light status bar icons (white) for better visibility on black background
        window.decorView.systemUiVisibility = 0
    }
}