from rest_framework import serializers

class AIFinderRequestSerializer(serializers.Serializer):
    budget = serializers.ChoiceField(choices=[
        '50l-1cr', '1cr-2cr', 'above-2cr'
    ])
    use_case = serializers.ChoiceField(choices=[
        'city', 'highway', 'sports'
    ])
    vibe = serializers.ChoiceField(choices=[
        'practical', 'sporty', 'ultra_luxury'
    ])

class AIFinderResponseSerializer(serializers.Serializer):
    car_id = serializers.IntegerField()
    car_name = serializers.CharField()
    reason = serializers.CharField()
    match_score = serializers.IntegerField()