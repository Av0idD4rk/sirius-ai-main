package io.av0idD4rk.ailibrary;

import android.os.Bundle;
import android.os.PersistableBundle;
import androidx.core.splashscreen.SplashScreen;
import androidx.annotation.Nullable;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private final boolean keep = true;
    @Override
    public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
        splashScreen.setKeepOnScreenCondition(new SplashScreen.KeepOnScreenCondition() {
            @Override
            public boolean shouldKeepOnScreen() {
                return keep;
            }
        });
        super.onCreate(savedInstanceState, persistentState);

    }
}
