package com.notes.keep.model;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;

public class CustomNotesSerializer extends JsonSerializer<Notes> {

    @Override
    public void serialize(Notes notes, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("noteId", notes.getNoteId().toString());
        jsonGenerator.writeStringField("title", notes.getTitle());
        jsonGenerator.writeStringField("description", notes.getDescription());
        jsonGenerator.writeBooleanField("completed", notes.isCompleted());
        jsonGenerator.writeStringField("date", notes.getDate());
        jsonGenerator.writeStringField("color", notes.getColor());
        // You can add more fields as needed

        // If you want to include the associated User's data, you can do so here
        User user = notes.getUser();
        if (user != null) {
            jsonGenerator.writeObjectFieldStart("user");
            jsonGenerator.writeStringField("userId", user.getUserId().toString());
            jsonGenerator.writeStringField("email", user.getEmail());
            jsonGenerator.writeStringField("firstName", user.getFirstName());
            jsonGenerator.writeStringField("lastName", user.getLastName());
            // Add more user fields if needed
            jsonGenerator.writeEndObject();
        } else {
            // Handle the case where user is null (if desired)
            jsonGenerator.writeObjectFieldStart("user");
            jsonGenerator.writeEndObject();
        }

        jsonGenerator.writeEndObject();
    }
}

