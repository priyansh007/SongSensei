# Generated by Django 4.2.4 on 2023-09-13 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SongSenseiApp", "0003_alter_mp3file_mp3_file"),
    ]

    operations = [
        migrations.AlterField(
            model_name="mp3file",
            name="mp3_file",
            field=models.FileField(upload_to="mp3_files/"),
        ),
    ]