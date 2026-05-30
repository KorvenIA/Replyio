const url = 'https://gkejxhceiptireiqzlho.supabase.co/rest/v1/documents?select=*&limit=1';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZWp4aGNlaXB0aXJlaXF6bGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4Njk0MDIsImV4cCI6MjA5NTQ0NTQwMn0.GYe9k8dINpPmunXCDv1Td6RV0IwFRsTokjBLCZzgzTc';
fetch(url, {
  headers: {
    'apikey': key,
    'Authorization': 'Bearer ' + key
  }
}).then(r => r.json()).then(data => console.log(data));
