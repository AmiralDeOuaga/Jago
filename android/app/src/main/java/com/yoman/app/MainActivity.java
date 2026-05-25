package com.yoman.app;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        clearCacheIfUpdated();
    }

    private void clearCacheIfUpdated() {
        try {
            SharedPreferences prefs = getSharedPreferences("jago_prefs", MODE_PRIVATE);
            int savedVersion = prefs.getInt("version_code", 0);
            int currentVersion = getPackageManager()
                .getPackageInfo(getPackageName(), 0).versionCode;

            if (savedVersion != currentVersion) {
                // Nouvelle version installée : vider le cache WebView + service workers
                WebView webView = getBridge().getWebView();
                if (webView != null) {
                    webView.clearCache(true);
                    webView.clearHistory();
                    // Vider aussi le storage web (localStorage, SW registrations)
                    android.webkit.WebStorage.getInstance().deleteAllData();
                }
                prefs.edit().putInt("version_code", currentVersion).apply();
            }
        } catch (Exception e) {
            // Ignorer silencieusement
        }
    }
}
