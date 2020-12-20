# Generated by Django 3.1.3 on 2020-12-03 12:44

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MainPurchaseRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('part_number', models.CharField(blank=True, max_length=80, null=True)),
                ('description', models.TextField(blank=True, max_length=250, null=True)),
                ('vendor_name', models.CharField(blank=True, max_length=50, null=True)),
                ('unit_price', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('quantity', models.IntegerField()),
                ('total_price', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('pr_number', models.CharField(blank=True, max_length=20, null=True)),
                ('line_number', models.IntegerField(blank=True, null=True)),
                ('site_name', models.CharField(blank=True, max_length=80, null=True)),
                ('month', models.CharField(blank=True, max_length=50, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='SitesPurchaseRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('part_number', models.CharField(blank=True, max_length=50, null=True)),
                ('description', models.TextField(blank=True, max_length=250, null=True)),
                ('vendor_name', models.CharField(blank=True, max_length=50, null=True)),
                ('unit_price', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('quantity', models.IntegerField()),
                ('total_price', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('pr_number', models.CharField(blank=True, max_length=20, null=True)),
                ('line_number', models.IntegerField(blank=True, null=True)),
                ('site_name', models.CharField(blank=True, max_length=50, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
