package com.myallpet.myallpet.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)  // Only include non-null values in the JSON response
public class ApiResponse<T> {
    private int statusCode;  // HTTP status code
    private String message;  // A message typically describing the result of the operation
    private T data;          // A generic type to hold any kind of data

    // Convenience method to create a successful response
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(200, message, data);
    }

    // Convenience method to create a failure response
    public static <T> ApiResponse<T> failure(int statusCode, String message) {
        return new ApiResponse<>(statusCode, message, null);
    }
}
