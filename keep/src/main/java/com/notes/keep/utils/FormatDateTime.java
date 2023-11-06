package com.notes.keep.utils;

public class FormatDateTime {

    public static String parseStandardDate(String date) {

        date = date.replace("Asia/Calcutta ", "");

        String[] arr = date.split(" ");

        String ch = arr[3];
        ch = ch.substring(0, ch.length() - 3);
        arr[3] = ch;

        StringBuilder sb = new StringBuilder();
        for (String element: arr) {
            sb.append(element).append(" ");
        }

        date = sb.toString().trim();
        return date;

    }

}


