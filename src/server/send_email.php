<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // دریافت اطلاعات ارسال شده از فرم
    $sessionTitle = $_POST["session_title"];
    $sessionDate = $_POST["session_date"];
    $sessionTime = $_POST["session_time"];
    $invitedExperts = $_POST["invited_experts"];
    $sessionPoints = $_POST["session_points"];
    $sessionReminder = $_POST["session_reminder"];

    die($sessionReminder);

    // تدوین متن ایمیل
    $emailContent = "عنوان جلسه: $sessionTitle\n";
    $emailContent .= "تاریخ جلسه: $sessionDate\n";
    $emailContent .= "ساعت جلسه: $sessionTime\n";
    $emailContent .= "مهمانان دعوت‌شده: " . implode(", ", $invitedExperts) . "\n";
    $emailContent .= "نکات مهم جلسه: $sessionPoints\n";
    $emailContent .= "یادآوری: $sessionReminder\n";

    // ارسال ایمیل
    $to = "receiver@example.com"; // آدرس ایمیل گیرنده
    $subject = "جلسه جدید: $sessionTitle"; // عنوان ایمیل
    $headers = "From: sender@example.com"; // آدرس ایمیل فرستنده و سایر تنظیمات

    // ارسال ایمیل با استفاده از تابع mail
    mail($to, $subject, $emailContent, $headers);
}