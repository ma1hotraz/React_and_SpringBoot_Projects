package com.notes.keep.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonParse {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    public static String parseObject(Object obj) {
        try {
            System.out.println(obj);
        } catch (Exception e) {
            // Handle exceptions (e.g., invalid JSON format)
            e.printStackTrace();
            return "Error processing the JSON";
        }
        return "null";
    }
}
