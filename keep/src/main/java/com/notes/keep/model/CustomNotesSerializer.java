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
        jsonGenerator.writeFieldName("date");
        jsonGenerator.writeObject(notes.getDate());
        jsonGenerator.writeStringField("color", notes.getColor());
        jsonGenerator.writeStringField("imageBg", notes.getImageBg());



        User user = notes.getUser();
        if (user != null) {
            jsonGenerator.writeObjectFieldStart("user");
            jsonGenerator.writeStringField("userId", user.getUserId().toString());
            jsonGenerator.writeStringField("email", user.getEmail());
            jsonGenerator.writeStringField("firstName", user.getFirstName());
            jsonGenerator.writeStringField("lastName", user.getLastName());
            jsonGenerator.writeEndObject();
        } else {
            jsonGenerator.writeObjectFieldStart("user");
            jsonGenerator.writeEndObject();
        }

        jsonGenerator.writeEndObject();
    }
}

