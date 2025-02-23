<?php

namespace App\Enums;

enum ProductCondition: string
{
    case EXCELLENT = 'ممتاز';
    case VERY_GOOD = 'جيد جداً';
    case GOOD = 'جيد';
    case FAIR = 'مقبول';
}
