from rest_framework import serializers

class AIFinderRequestSerializer(serializers.Serializer):
    budget = serializers.ChoiceField(choices=[
        'under-50l', '50l-1cr', 'above-1cr'
    ])
    use_case = serializers.ChoiceField(choices=[
        'city', 'highway', 'weekend-sports'
    ])
    vibe = serializers.ChoiceField(choices=[
        'practical', 'sporty', 'ultra-luxury'
    ])


class AIFinderResponseSerializer(serializers.Serializer):
    car_id = serializers.IntegerField()
    car_name = serializers.CharField()
    reason = serializers.CharField()
    match_score = serializers.IntegerField()