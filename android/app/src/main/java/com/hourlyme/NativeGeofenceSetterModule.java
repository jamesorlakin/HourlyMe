package com.hourlyme;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingClient;
import com.google.android.gms.location.GeofencingRequest;
import com.google.android.gms.location.LocationServices;

public class NativeGeofenceSetterModule extends ReactContextBaseJavaModule {

    Context mContext;

    public NativeGeofenceSetterModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @ReactMethod
    public void createGeofence(int organisationID, double latitude, double longitude, int radius, Promise promise) {
        GeofencingClient geofenceClient = LocationServices.getGeofencingClient(mContext);
        Geofence geofence = new Geofence.Builder()
                // Set the request ID of the geofence. This is a string to identify this
                // geofence.
                .setRequestId(String.valueOf(organisationID))
                .setCircularRegion(
                        latitude,
                        longitude,
                        radius
                )
                .setExpirationDuration(Integer.MAX_VALUE)
                .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER |
                        Geofence.GEOFENCE_TRANSITION_EXIT)
                .build();
        GeofencingRequest.Builder requestBuilder = new GeofencingRequest.Builder();
        requestBuilder.addGeofence(geofence);

        Intent intent = new Intent(mContext, GeofenceService.class);
        mGeofencePendingIntent = PendingIntent.getService(mContext, 0, intent, PendingIntent.
                FLAG_UPDATE_CURRENT);
        return mGeofencePendingIntent;

        geofenceClient.addGeofences(requestBuilder.build(),);
    }

    @Override
    public String getName() {
        return "GeofenceSetter";
    }
}