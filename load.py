import pandas as pd
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb+srv://virajmane082:viru123@cluster0.072pt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["test"]
collection = db["players"]

# Read CSV and insert into MongoDB
df = pd.read_csv("data.csv")
collection.insert_many(df.to_dict(orient="records"))

print("Data imported successfully!")




