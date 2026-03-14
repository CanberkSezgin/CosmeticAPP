import { NextResponse } from 'next/server';
import { analyzeImagesInternal } from '@/lib/gemini';
import { Language } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { faceImage, veinImage, lang } = body;

    if (!faceImage || !veinImage) {
      return NextResponse.json(
        { error: 'Both face and vein images are required.' },
        { status: 400 }
      );
    }

    // Call our Gemini service
    const analysisResult = await analyzeImagesInternal(
      faceImage,
      veinImage,
      (lang as Language) || 'en'
    );

    // Attach the original image url back to the payload so the frontend can display it
    analysisResult.imageUrl = faceImage;

    return NextResponse.json(analysisResult);
  } catch (error: any) {
    console.error('API /analyze error:', error);
    return NextResponse.json(
      { error: error?.message || 'Something went wrong processing the images.' },
      { status: 500 }
    );
  }
}
