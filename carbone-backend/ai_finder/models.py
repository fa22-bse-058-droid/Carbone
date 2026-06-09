from django.db import models

class AIFinderSession(models.Model):
    budget = models.CharField(max_length=50)
    use_case = models.CharField(max_length=50)
    vibe = models.CharField(max_length=50)
    recommendations = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Session {self.id} — {self.budget} / {self.vibe}'