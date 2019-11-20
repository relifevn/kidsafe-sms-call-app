//DirectCallModule.java
package com.awesomeproject;
 
import android.content.Intent;
import android.net.Uri;
import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import android.widget.Toast;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactContext;
 
public class DirectCallModule extends ReactContextBaseJavaModule {
 
    public DirectCallModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }
 
    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() { 
        return "DirectCall";
    }
 
    @ReactMethod
    public void call(String phoneNumber) {
        try {  
            Intent phoneIntent = new Intent(Intent.ACTION_CALL);
            phoneIntent.setData(Uri.parse("tel:" + phoneNumber));
            ReactApplicationContext context = getReactApplicationContext();
            context.startActivity(phoneIntent);
        } catch (Exception ex) {
            System.out.println("couldn't call.");
        } 
    }
}
