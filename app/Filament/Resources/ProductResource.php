<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('عنوان')
                    ->required(),
                Forms\Components\TextInput::make('price')
                    ->label('السعر')
                    ->numeric()
                    ->nullable(),
                Forms\Components\FileUpload::make('image')
                    ->label('الصورة')
                    ->image()
                    ->directory('products'),
                Forms\Components\TextInput::make('size')
                    ->label('المقاس')
                    ->required(),
                Forms\Components\TextInput::make('brand')
                    ->label('الماركة')
                    ->required(),
                Forms\Components\Select::make('type')
                    ->label('النوع')
                    ->options([
                        'auction' => 'مزاد',
                        'giveaway' => 'هدية',
                    ])
                    ->required(),
                Forms\Components\Select::make('condition')
                    ->label('الحالة')
                    ->options([
                        'new' => 'جديد',
                        'like_new' => 'كالجديد',
                        'good' => 'جيد',
                        'acceptable' => 'مقبول',
                    ])
                    ->required(),
                Forms\Components\DateTimePicker::make('end_date')
                    ->label('تاريخ الانتهاء')
                    ->nullable(),
                Forms\Components\Textarea::make('description')
                    ->label('الوصف')
                    ->nullable(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('عنوان')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->label('السعر')
                    ->money('sar'),
                Tables\Columns\TextColumn::make('type')
                    ->label('النوع'),
                Tables\Columns\TextColumn::make('condition')
                    ->label('الحالة'),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('المالك'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('تاريخ الإنشاء')
                    ->dateTime(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'auction' => 'مزاد',
                        'giveaway' => 'هدية',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
